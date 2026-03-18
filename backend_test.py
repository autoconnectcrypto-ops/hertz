import requests
import sys
from datetime import datetime

class HertzProAPITester:
    def __init__(self, base_url="https://hertz-pro-preview-1.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                    elif isinstance(response_data, dict):
                        print(f"   Response keys: {list(response_data.keys())}")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                self.failed_tests.append({
                    'test': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")

            return success, response.json() if success and response.text else {}

        except Exception as e:
            self.failed_tests.append({
                'test': name,
                'error': str(e)
            })
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "",
            200
        )

    def test_seed_data(self):
        """Test seeding initial data"""
        return self.run_test(
            "Seed Data",
            "POST",
            "seed",
            200
        )

    def test_get_vehicles(self):
        """Test getting all vehicles"""
        success, response = self.run_test(
            "Get All Vehicles",
            "GET",
            "vehicles",
            200
        )
        
        if success and isinstance(response, list):
            print(f"   Found {len(response)} vehicles")
            if len(response) > 0:
                vehicle = response[0]
                required_fields = ['id', 'marque', 'modele', 'annee', 'km', 'prix']
                missing_fields = [field for field in required_fields if field not in vehicle]
                if missing_fields:
                    print(f"   ⚠️  Missing fields in vehicle: {missing_fields}")
                else:
                    print(f"   ✅ Vehicle structure looks good")
        
        return success, response

    def test_get_specific_vehicle(self, vehicle_id="vw-troc-2022-001"):
        """Test getting a specific vehicle"""
        success, response = self.run_test(
            f"Get Vehicle {vehicle_id}",
            "GET",
            f"vehicles/{vehicle_id}",
            200
        )
        
        if success:
            # Check vehicle structure
            required_fields = ['id', 'marque', 'modele', 'annee', 'km', 'prix', 'images', 'specs', 'options', 'historique']
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                print(f"   ⚠️  Missing fields: {missing_fields}")
            else:
                print(f"   ✅ Complete vehicle data structure")
                
            # Check images
            if 'images' in response and len(response['images']) > 0:
                print(f"   ✅ Has {len(response['images'])} images")
            else:
                print(f"   ⚠️  No images found")
                
            # Check options
            if 'options' in response and len(response['options']) > 0:
                print(f"   ✅ Has {len(response['options'])} options")
            else:
                print(f"   ⚠️  No options found")
                
            # Check history
            if 'historique' in response and len(response['historique']) > 0:
                print(f"   ✅ Has {len(response['historique'])} history records")
            else:
                print(f"   ⚠️  No history records found")
        
        return success, response

    def test_get_nonexistent_vehicle(self):
        """Test getting a non-existent vehicle"""
        return self.run_test(
            "Get Non-existent Vehicle",
            "GET",
            "vehicles/nonexistent-id",
            404
        )

    def test_create_contact(self):
        """Test creating a contact message"""
        contact_data = {
            "nom": "Test User",
            "email": "test@example.com",
            "telephone": "+33123456789",
            "message": "Test message from automated testing"
        }
        
        success, response = self.run_test(
            "Create Contact Message",
            "POST",
            "contact",
            200,
            data=contact_data
        )
        
        if success:
            required_fields = ['id', 'nom', 'email', 'telephone', 'message', 'created_at']
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                print(f"   ⚠️  Missing fields in response: {missing_fields}")
            else:
                print(f"   ✅ Contact message created successfully")
                
        return success, response

    def test_get_contacts(self):
        """Test getting all contact messages"""
        return self.run_test(
            "Get All Contacts",
            "GET",
            "contact",
            200
        )

    def test_create_vehicle(self):
        """Test creating a new vehicle"""
        vehicle_data = {
            "marque": "Test",
            "modele": "Vehicle",
            "annee": 2023,
            "km": 10000,
            "prix": 15000,
            "prix_original": 18000,
            "couleur": "Rouge",
            "images": [
                {"url": "https://example.com/test.jpg", "alt": "Test image"}
            ],
            "specs": {
                "carburant": "Essence",
                "boite": "Manuelle",
                "puissance": "120 ch",
                "puissance_fiscale": "6 CV",
                "cylindree": "1600 cm³",
                "portes": 5,
                "categorie": "Berline"
            },
            "options": ["Climatisation", "GPS"],
            "historique": [
                {"date": "01/01/2024", "km": "5000", "interventions": "Révision"}
            ],
            "description": "Véhicule de test",
            "disponible": True
        }
        
        success, response = self.run_test(
            "Create Vehicle",
            "POST",
            "vehicles",
            200,
            data=vehicle_data
        )
        
        return success, response

def main():
    print("🚗 HERTZ-PRO API Testing Suite")
    print("=" * 50)
    
    tester = HertzProAPITester()
    
    # Test sequence
    print("\n📋 Running API Tests...")
    
    # 1. Test root endpoint
    tester.test_root_endpoint()
    
    # 2. Seed data
    tester.test_seed_data()
    
    # 3. Test vehicle endpoints
    success, vehicles = tester.test_get_vehicles()
    
    # 4. Test specific vehicle (the seeded VW T-Roc)
    tester.test_get_specific_vehicle("vw-troc-2022-001")
    
    # 5. Test non-existent vehicle
    tester.test_get_nonexistent_vehicle()
    
    # 6. Test contact endpoints
    tester.test_create_contact()
    tester.test_get_contacts()
    
    # 7. Test vehicle creation
    tester.test_create_vehicle()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print(f"\n❌ Failed Tests ({len(tester.failed_tests)}):")
        for i, failure in enumerate(tester.failed_tests, 1):
            print(f"   {i}. {failure['test']}")
            if 'expected' in failure:
                print(f"      Expected: {failure['expected']}, Got: {failure['actual']}")
                print(f"      Response: {failure['response']}")
            if 'error' in failure:
                print(f"      Error: {failure['error']}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"\n🎯 Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())