import json
import os
import sys

def main():
    """Fix the ISO code for Micronesia in the dataset"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.dirname(script_dir)
    dataset_path = os.path.join(root_dir, 'public', 'Dataset_PAC4_InfyViz_cleaned.json')
    
    # Load the dataset
    try:
        with open(dataset_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            print(f"Loaded {len(data)} records from dataset")
    except Exception as e:
        print(f"Error loading dataset: {e}")
        return
    
    # Fix Micronesia entries
    fixed_count = 0
    for entry in data:
        if entry.get('country') == 'Micronesia' and not entry.get('iso_code'):
            entry['iso_code'] = 'FSM'
            fixed_count += 1
    
    if fixed_count > 0:
        print(f"Fixed {fixed_count} Micronesia entries, adding ISO code 'FSM'")
        
        # Backup the original file
        backup_path = dataset_path + '.bak'
        try:
            with open(backup_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2)
                print(f"Created backup at {backup_path}")
        except Exception as e:
            print(f"Error creating backup: {e}")
            return
        
        # Save the updated dataset
        try:
            with open(dataset_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2)
                print(f"Updated dataset saved to {dataset_path}")
        except Exception as e:
            print(f"Error saving updated dataset: {e}")
    else:
        print("No Micronesia entries found to fix")

if __name__ == "__main__":
    main() 