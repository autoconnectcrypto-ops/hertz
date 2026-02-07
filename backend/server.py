from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class VehicleImage(BaseModel):
    url: str
    alt: str = ""

class VehicleSpecs(BaseModel):
    carburant: str = ""
    boite: str = ""
    puissance: str = ""
    puissance_fiscale: str = ""
    cylindree: str = ""
    portes: int = 5
    categorie: str = ""

class VehicleHistory(BaseModel):
    date: str
    km: str
    interventions: str

class Vehicle(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    reference: Optional[str] = None
    marque: str
    modele: str
    annee: int
    km: int
    prix: float
    prix_original: Optional[float] = None
    couleur: str
    images: List[VehicleImage] = []
    specs: VehicleSpecs = VehicleSpecs()
    options: List[str] = []
    historique: List[VehicleHistory] = []
    description: str = ""
    disponible: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class VehicleCreate(BaseModel):
    marque: str
    modele: str
    annee: int
    km: int
    prix: float
    prix_original: Optional[float] = None
    couleur: str
    images: List[VehicleImage] = []
    specs: VehicleSpecs = VehicleSpecs()
    options: List[str] = []
    historique: List[VehicleHistory] = []
    description: str = ""
    disponible: bool = True

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nom: str
    email: str
    telephone: str
    message: str
    vehicule_id: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    nom: str
    email: str
    telephone: str
    message: str
    vehicule_id: Optional[str] = None

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "HERTZ-PRO API - Vente de véhicules"}

# Vehicle endpoints
@api_router.get("/vehicles", response_model=List[Vehicle])
async def get_vehicles():
    vehicles = await db.vehicles.find({}, {"_id": 0}).to_list(1000)
    for v in vehicles:
        if isinstance(v.get('created_at'), str):
            v['created_at'] = datetime.fromisoformat(v['created_at'])
    return vehicles

@api_router.get("/vehicles/{vehicle_id}", response_model=Vehicle)
async def get_vehicle(vehicle_id: str):
    vehicle = await db.vehicles.find_one({"id": vehicle_id}, {"_id": 0})
    if not vehicle:
        raise HTTPException(status_code=404, detail="Véhicule non trouvé")
    if isinstance(vehicle.get('created_at'), str):
        vehicle['created_at'] = datetime.fromisoformat(vehicle['created_at'])
    return vehicle

@api_router.post("/vehicles", response_model=Vehicle)
async def create_vehicle(vehicle_data: VehicleCreate):
    vehicle = Vehicle(**vehicle_data.model_dump())
    doc = vehicle.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.vehicles.insert_one(doc)
    return vehicle

@api_router.delete("/vehicles/{vehicle_id}")
async def delete_vehicle(vehicle_id: str):
    result = await db.vehicles.delete_one({"id": vehicle_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Véhicule non trouvé")
    return {"message": "Véhicule supprimé"}

# Update vehicle endpoint
@api_router.put("/vehicles/{vehicle_id}")
async def update_vehicle(vehicle_id: str, updates: dict):
    """Update vehicle with partial data"""
    # Remove fields that shouldn't be updated
    updates.pop('id', None)
    updates.pop('_id', None)
    updates.pop('created_at', None)
    
    result = await db.vehicles.update_one(
        {"id": vehicle_id},
        {"$set": updates}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Véhicule non trouvé")
    
    # Return updated vehicle
    vehicle = await db.vehicles.find_one({"id": vehicle_id}, {"_id": 0})
    return vehicle

# Contact endpoints
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(contact_data: ContactMessageCreate):
    contact = ContactMessage(**contact_data.model_dump())
    doc = contact.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contacts.insert_one(doc)
    return contact

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    for c in contacts:
        if isinstance(c.get('created_at'), str):
            c['created_at'] = datetime.fromisoformat(c['created_at'])
    return contacts

# Seed initial data
@api_router.post("/seed")
async def seed_data():
    # Check if data already exists
    count = await db.vehicles.count_documents({})
    if count > 0:
        return {"message": "Données déjà présentes", "count": count}
    
    # Volkswagen T-Roc data from user
    troc = {
        "id": "vw-troc-2022-001",
        "marque": "Volkswagen",
        "modele": "T-Roc",
        "annee": 2022,
        "km": 56393,
        "prix": 22900,
        "prix_original": 28625,
        "couleur": "Blanc",
        "images": [
            {"url": "https://customer-assets.emergentagent.com/job_hertz-showroom/artifacts/azamp8rt_1.jpg", "alt": "VW T-Roc Vue avant"},
            {"url": "https://customer-assets.emergentagent.com/job_hertz-showroom/artifacts/igxi0q43_2.jpeg", "alt": "VW T-Roc Vue côté"},
            {"url": "https://customer-assets.emergentagent.com/job_hertz-showroom/artifacts/dz89jdyh_4.jpeg", "alt": "VW T-Roc Vue 3/4 avant"},
            {"url": "https://customer-assets.emergentagent.com/job_hertz-showroom/artifacts/d06o5y7h_5.jpeg", "alt": "VW T-Roc Vue 3/4 arrière"}
        ],
        "specs": {
            "carburant": "Diesel",
            "boite": "Automatique DSG7",
            "puissance": "150 ch / 110 kW",
            "puissance_fiscale": "8 CV",
            "cylindree": "1 968 cm³",
            "portes": 5,
            "categorie": "SUV"
        },
        "options": [
            "App-Connect (Android Auto / Apple CarPlay)",
            "Digital Cockpit - Tableau de bord numérique",
            "Climatisation Climatronic 2 zones",
            "Caméra de recul",
            "Vitres athermiques",
            "Lève-vitres électriques AV/AR",
            "Aide au démarrage en côte",
            "Détection panneaux de signalisation",
            "Appel d'urgence automatique",
            "Détecteur de somnolence",
            "Lane Assist - Maintien de trajectoire",
            "Park Assist - Aide au stationnement",
            "Fixations ISOFIX",
            "Capteur de pression des pneus",
            "Essuie-glaces automatiques",
            "Light Assist - Feux de route auto",
            "Détection piétons",
            "Start/Stop automatique",
            "Feux LED arrière",
            "Jantes alliage",
            "Barres de toit"
        ],
        "historique": [
            {"date": "17/01/2025", "km": "52 307", "interventions": "Balais essuie-glace AV/AR, Liquide de frein, Plaquettes freins AV, Révision complète"},
            {"date": "29/05/2024", "km": "37 520", "interventions": "Révision"},
            {"date": "05/12/2023", "km": "25 991", "interventions": "Changement pneus été → hiver"},
            {"date": "05/10/2023", "km": "22 146", "interventions": "Révision"}
        ],
        "description": "Volkswagen T-Roc en excellent état, issu de la flotte Hertz. Entretien complet effectué en concession. Véhicule non-fumeur, très bien équipé avec toutes les aides à la conduite modernes. Idéal pour la famille.",
        "disponible": True,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.vehicles.insert_one(troc)
    return {"message": "Données initiales créées", "count": 1}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
