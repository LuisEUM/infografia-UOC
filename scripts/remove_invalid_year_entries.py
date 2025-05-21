import json
import os

def load_dataset():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.dirname(script_dir)
    dataset_path = os.path.join(root_dir, 'public', 'Dataset_PAC4_InfyViz_cleaned.json')
    print(f"Loading dataset from: {dataset_path}")
    with open(dataset_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        print(f"Loaded {len(data)} records")
        return data

def remove_invalid_year_entries():
    data = load_dataset()
    
    # Count original entries
    original_count = len(data)
    
    # Check for the presence of "year" or "ÿear" property
    year_keys = set()
    for item in data:
        for key in item.keys():
            if key.lower() in ["year", "ÿear"]:
                year_keys.add(key)
    
    print(f"Found year-related properties: {year_keys}")
    
    # Filter out entries with year values from 1 to 19
    filtered_data = []
    for item in data:
        is_invalid = False
        for key in year_keys:
            if key in item and isinstance(item[key], (int, float)) and 1 <= item[key] <= 19:
                is_invalid = True
                break
        if not is_invalid:
            filtered_data.append(item)
    
    # Count removed entries
    removed_count = original_count - len(filtered_data)
    print(f"Removed {removed_count} entries with invalid year values (1-19)")
    print(f"Remaining entries: {len(filtered_data)}")
    
    # Save the filtered dataset
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.dirname(script_dir)
    output_path = os.path.join(root_dir, 'public', 'Dataset_PAC4_InfyViz_cleaned_fixed.json')
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(filtered_data, f, ensure_ascii=False, indent=2)
    
    print(f"Saved cleaned dataset to: {output_path}")

if __name__ == "__main__":
    remove_invalid_year_entries() 