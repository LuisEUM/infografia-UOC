import json
import os
import sys

def main():
    """Remove non-country entries from the dataset"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.dirname(script_dir)
    dataset_path = os.path.join(root_dir, 'public', 'Dataset_PAC4_InfyViz_cleaned.json')
    
    # Non-countries to remove
    non_countries = [
        "América",
        "French West Africa",
        "Leeward Islands",
        "Macao",
        "Kuwaiti Oil Fires"  # Also mentioned in debug output
    ]
    
    # Load the dataset
    try:
        with open(dataset_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            original_count = len(data)
            print(f"Loaded {original_count} records from dataset")
    except Exception as e:
        print(f"Error loading dataset: {e}")
        return
    
    # Create backup before making changes
    backup_path = dataset_path + '.non_countries.bak'
    try:
        with open(backup_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
            print(f"Created backup at {backup_path}")
    except Exception as e:
        print(f"Error creating backup: {e}")
        return
    
    # Filter out non-countries
    filtered_data = []
    removed_counts = {country: 0 for country in non_countries}
    
    for entry in data:
        country_name = entry.get('country', '')
        if country_name in non_countries:
            removed_counts[country_name] += 1
        else:
            filtered_data.append(entry)
    
    # Print removal statistics
    total_removed = sum(removed_counts.values())
    print(f"Removed {total_removed} entries in total:")
    for country, count in removed_counts.items():
        if count > 0:
            print(f"  - {country}: {count} entries removed")
    
    # Save the updated dataset
    try:
        with open(dataset_path, 'w', encoding='utf-8') as f:
            json.dump(filtered_data, f, indent=2)
            print(f"Updated dataset saved with {len(filtered_data)} records (removed {original_count - len(filtered_data)} entries)")
    except Exception as e:
        print(f"Error saving updated dataset: {e}")
        return
    
    print("Non-country removal completed successfully!")

if __name__ == "__main__":
    main() 