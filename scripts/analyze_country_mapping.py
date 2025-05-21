import json
import os
import sys
import traceback

# Add the path to access the MapChart.tsx file if needed
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

def load_iso_mapping_from_tsx():
    """Extract the ISO mapping dictionary from MapChart.tsx"""
    mapping_file = os.path.join(os.path.dirname(__file__), "..", "app", "components", "MapChart.tsx")
    iso_mapping = {}
    
    try:
        with open(mapping_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Find the mapping dictionary
        start_marker = "const ISO_NUMERIC_TO_ALPHA3: Record<string, string> = {"
        end_marker = "};"
        
        start_idx = content.find(start_marker)
        if start_idx < 0:
            print(f"Could not find start marker: {start_marker}")
            return {}
            
        start_idx += len(start_marker)
        end_idx = content.find(end_marker, start_idx)
        
        if end_idx < 0:
            print(f"Could not find end marker: {end_marker}")
            return {}
            
        print(f"Found mapping dictionary from position {start_idx} to {end_idx}")
        mapping_content = content[start_idx:end_idx].strip()
        
        # Parse the mapping entries
        line_count = 0
        for line in mapping_content.split('\n'):
            line = line.strip()
            line_count += 1
            
            if not line or line.startswith('//'):
                continue
                
            try:
                parts = line.split(':')
                if len(parts) >= 2:
                    numeric_code = parts[0].strip().strip('"')
                    
                    # Extract alpha3 code, handling the comma at the end
                    alpha3_part = parts[1].split(',')[0].strip().strip('"')
                    
                    if alpha3_part:
                        iso_mapping[numeric_code] = alpha3_part
            except Exception as e:
                print(f"Error parsing line {line_count}: '{line}' - {e}")
        
        return iso_mapping
    except Exception as e:
        print(f"Error loading ISO mapping: {e}")
        traceback.print_exc()
        return {}

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
        traceback.print_exc()
        return []

def analyze_country_mapping():
    try:
        # Load the dataset
        dataset = load_dataset()
        if not dataset:
            print("Failed to load dataset, exiting...")
            return
            
        # Get unique countries in the dataset
        dataset_countries = {}
        for entry in dataset:
            if 'iso_code' in entry and 'country' in entry:
                dataset_countries[entry['iso_code']] = entry['country']
        
        print(f"Found {len(dataset_countries)} unique countries in the dataset")
        
        # Load the ISO mapping from MapChart.tsx
        iso_mapping = load_iso_mapping_from_tsx()
        if not iso_mapping:
            print("Failed to load ISO mappings from MapChart.tsx, exiting...")
            return
            
        map_countries = set(iso_mapping.values())
        
        print(f"Found {len(iso_mapping)} numeric to alpha3 mappings in MapChart.tsx")
        print(f"Found {len(map_countries)} unique alpha3 codes in the mapping")
        
        # Find countries in dataset but not in map
        missing_in_map = []
        for iso_code, country_name in dataset_countries.items():
            if iso_code not in map_countries:
                missing_in_map.append((iso_code, country_name))
        
        # Find countries in map but not in dataset
        extra_in_map = []
        for iso_code in map_countries:
            if iso_code not in dataset_countries:
                extra_in_map.append(iso_code)
        
        # Print results
        print("\n=== ANALYSIS RESULTS ===")
        
        if missing_in_map:
            print(f"\n{len(missing_in_map)} countries in dataset but missing in map:")
            for iso, name in sorted(missing_in_map):
                print(f"- {iso}: {name}")
        else:
            print("\nAll countries in the dataset are present in the map mapping.")
        
        if extra_in_map:
            print(f"\n{len(extra_in_map)} countries in map but not in dataset:")
            for iso in sorted(extra_in_map):
                print(f"- {iso}")
        else:
            print("\nAll countries in the map mapping are present in the dataset.")
        
        # Suggest potential mapping solutions for missing countries
        if missing_in_map:
            print("\n=== SUGGESTED SOLUTIONS ===")
            print("Add these entries to the ISO_NUMERIC_TO_ALPHA3 mapping in MapChart.tsx:")
            for iso, name in sorted(missing_in_map):
                print(f'  "XXX": "{iso}", // {name}')
            print("\nNote: You need to replace 'XXX' with the appropriate numeric ISO code for each country.")
    except Exception as e:
        print(f"Error during analysis: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    analyze_country_mapping() 