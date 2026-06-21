#!/usr/bin/env python3
import os
import csv
import urllib.request
import urllib.parse
import argparse

def download_image(url, output_path):
    """
    Downloads an image from a URL and saves it to output_path.
    Uses custom User-Agent to avoid issues with basic request blocks.
    """
    # Ensure target directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # If the file already exists, we can optionally skip downloading to save bandwidth/time
    if os.path.exists(output_path) and os.path.getsize(output_path) > 0:
        print(f"File already exists (skipping download): {output_path}")
        return True

    headers = {
        'User-Agent': (
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
            'AppleWebKit/537.36 (KHTML, like Gecko) '
            'Chrome/120.0.0.0 Safari/537.36'
        )
    }

    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            with open(output_path, 'wb') as out_file:
                out_file.write(response.read())
        print(f"Downloaded: {url} -> {output_path}")
        return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

def parse_args():
    parser = argparse.ArgumentParser(
        description="Convert the private product CSV into the public catalog CSV."
    )
    parser.add_argument(
        '--remote-img',
        action='store_true',
        help=(
            'Use the original image_link URL in image_path instead of downloading '
            'the image into assets/<id>/ and using a local path.'
        ),
    )
    return parser.parse_args()

def main():
    args = parse_args()

    # Resolve absolute paths relative to project root
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)

    input_csv_path = os.path.join(project_root, 'private', 'Jastip UAE-Indo July 2026 - PriceList.csv')
    output_csv_path = os.path.join(project_root, 'data', 'product_list.csv')

    print(f"Reading private CSV from: {input_csv_path}")
    print(f"Writing public CSV to: {output_csv_path}")

    # Ensure output data directory exists
    os.makedirs(os.path.dirname(output_csv_path), exist_ok=True)

    if not os.path.exists(input_csv_path):
        print(f"Error: Input file '{input_csv_path}' does not exist.")
        return

    public_rows = []

    with open(input_csv_path, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        
        # Validate columns
        required_fields = ['id', 'category', 'product', 'size', 'unit', 'idr_sell', 'image_link']
        for field in required_fields:
            if field not in reader.fieldnames:
                print(f"Error: Required field '{field}' is missing from the input CSV.")
                return

        for row in reader:
            product_id = row['id'].strip()
            image_url = row['image_link'].strip()

            image_path_value = ""
            if image_url:
                if args.remote_img:
                    image_path_value = image_url
                    print(f"\nUsing remote image URL for product ID {product_id}: {row['product']}")
                else:
                    # Extract filename from URL
                    parsed_url = urllib.parse.urlparse(image_url)
                    filename = os.path.basename(parsed_url.path)

                    # If parsed filename is empty, provide a fallback name
                    if not filename:
                        filename = f"image_{product_id}.jpg"

                    # Define the local destination path relative to project root
                    relative_image_path = f"assets/{product_id}/{filename}"
                    absolute_image_path = os.path.join(project_root, relative_image_path)

                    print(f"\nProcessing product ID {product_id}: {row['product']}")
                    success = download_image(image_url, absolute_image_path)
                    if success:
                        image_path_value = relative_image_path
            else:
                print(f"\nNo image URL for product ID {product_id}: {row['product']}")

            # Filter public data
            public_rows.append({
                'id': product_id,
                'category': row['category'].strip(),
                'brand': row.get('brand', '').strip(),
                'product': row['product'].strip(),
                'size': row['size'].strip(),
                'unit': row['unit'].strip(),
                'idr_sell': row['idr_sell'].strip(),
                'image_path': image_path_value,
                'product_description': row.get('product_description', '').strip()
            })

    # Write public CSV database
    fieldnames = ['id', 'category', 'brand', 'product', 'size', 'unit', 'idr_sell', 'image_path', 'product_description']
    with open(output_csv_path, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(public_rows)

    print(f"\nSuccessfully finished! Public CSV saved to {output_csv_path}")

if __name__ == '__main__':
    main()
