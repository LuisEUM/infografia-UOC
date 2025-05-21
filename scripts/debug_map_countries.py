import json
import os
import sys
import re

def load_dataset():
    """Load the cleaned dataset"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.dirname(script_dir)
    dataset_path = os.path.join(root_dir, 'public', 'Dataset_PAC4_InfyViz_cleaned.json')
    
    try:
        with open(dataset_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data
    except Exception as e:
        print(f"Error loading dataset: {e}")
        return []

def extract_countries_from_tsx():
    """Extract ISO codes from the MapChart.tsx file"""
    mapping_file = os.path.join(os.path.dirname(__file__), "..", "app", "components", "MapChart.tsx")
    iso_codes = []
    
    try:
        with open(mapping_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Use a more reliable regex pattern to extract ISO codes
        pattern = r'"(\d+)":\s*"([A-Z0-9_]+)",\s*//\s*(.+)'
        matches = re.findall(pattern, content)
        
        iso_map = {}
        for num_code, alpha_code, country_name in matches:
            iso_map[num_code] = (alpha_code, country_name.strip())
            iso_codes.append(alpha_code)
            
        print(f"Extracted {len(iso_map)} mappings")
        return iso_codes
    except Exception as e:
        print(f"Error extracting ISO codes: {e}")
        return []

def main():
    # Load dataset
    dataset = load_dataset()
    if not dataset:
        print("Failed to load dataset")
        return
    
    # Get unique countries in dataset
    dataset_countries = {}
    empty_iso_entries = []
    
    for entry in dataset:
        if 'iso_code' in entry and 'country' in entry:
            if entry['iso_code']:  # Only include non-empty ISO codes
                dataset_countries[entry['iso_code']] = entry['country']
            else:
                empty_iso_entries.append(entry['country'])
    
    print(f"Found {len(dataset_countries)} unique countries with valid ISO codes in dataset")
    if empty_iso_entries:
        print(f"Found {len(empty_iso_entries)} entries with empty ISO codes: {', '.join(set(empty_iso_entries))}")
    
    # Extract ISO codes from TSX
    map_countries = extract_countries_from_tsx()
    print(f"Found {len(map_countries)} ISO codes in MapChart.tsx")
    
    # Compare
    dataset_iso_set = set(dataset_countries.keys())
    map_iso_set = set(map_countries)
    
    missing_in_map = dataset_iso_set - map_iso_set
    extra_in_map = map_iso_set - dataset_iso_set
    
    print("\n=== COUNTRIES IN DATASET BUT NOT IN MAP ===")
    for iso in sorted(missing_in_map):
        print(f"{iso}: {dataset_countries.get(iso, 'Unknown')}")
    
    print("\n=== COUNTRIES IN MAP BUT NOT IN DATASET ===")
    for iso in sorted(extra_in_map):
        print(iso)
    
    print("\n=== OVERLAPPING COUNTRIES ===")
    print(f"Countries in both dataset and map: {len(dataset_iso_set & map_iso_set)}")

if __name__ == "__main__":
    main() 