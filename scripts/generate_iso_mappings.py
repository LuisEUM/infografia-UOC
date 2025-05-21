import json
import pycountry
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

def generate_iso_mappings():
    data = load_dataset()
    
    # Get unique countries from the dataset
    unique_countries = {item['iso_code']: item['country'] for item in data}
    print(f"\nFound {len(unique_countries)} unique countries:")
    for iso, name in unique_countries.items():
        print(f"- {iso}: {name}")
    
    # Create mappings
    mappings = {}
    for alpha3 in unique_countries.keys():
        try:
            country = pycountry.countries.get(alpha_3=alpha3)
            if country and country.numeric:
                mappings[country.numeric] = alpha3
        except:
            print(f"Warning: Could not find numeric code for {alpha3}")
            continue
    
    print(f"\nGenerated {len(mappings)} mappings:")
    
    # Generate TypeScript code
    ts_code = "const ISO_NUMERIC_TO_ALPHA3: Record<string, string> = {\n"
    for numeric, alpha3 in sorted(mappings.items(), key=lambda x: int(x[0])):
        country_name = unique_countries[alpha3]
        ts_code += f'  "{numeric}": "{alpha3}", // {country_name}\n'
    ts_code += "};\n"
    
    print(ts_code)

if __name__ == "__main__":
    generate_iso_mappings() 