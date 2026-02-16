# Imperial Transfers Backend

Backend API pour le service de transferts Impérial Transfers avec support des paiements Stripe, notifications Firebase et calcul de tarification dynamique.

## 📋 Prérequis

- Node.js >= 14
- npm ou yarn
- Compte Stripe
- Compte Firebase

## 🚀 Installation

1. **Cloner le repo et installer les dépendances**
```bash
npm install
```

2. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

3. **Remplir votre fichier `.env` avec :**
   - `STRIPE_SECRET_KEY` : Clé secrète Stripe
   - `FIREBASE_SERVICE_ACCOUNT` : JSON de votre compte service Firebase
   - `PORT` : Port du serveur (défaut: 3000)

4. **Lancer le serveur**
```bash
npm start
```

## 📡 Endpoints API

### 1. Calculer le prix de la course
**POST** `/calculate`

```json
{
  "distanceKm": 25,
  "durationMin": 45,
  "isMountain": true,
  "skiOption": false
}
```

**Réponse:**
```json
{
  "price": 120.50
}
```

### 2. Créer une nouvelle course
**POST** `/booking`

```json
{
  "pickupAddress": "123 Rue de la Paix, Paris",
  "dropoffAddress": "456 Avenue de Montagne, Chamonix",
  "distanceKm": 25,
  "durationMin": 45,
  "passengers": 2,
  "luggage": 3,
  "paymentMethod": "online",
  "isMountain": true,
  "skiOption": false
}
```

**Réponse:**
```json
{
  "ride": {
    "id": 1,
    "pickupAddress": "123 Rue de la Paix, Paris",
    "dropoffAddress": "456 Avenue de Montagne, Chamonix",
    "distanceKm": 25,
    "durationMin": 45,
    "passengers": 2,
    "luggage": 3,
    "price": 120.50,
    "paymentMethod": "online",
    "status": "pending_payment",
    "createdAt": "2026-02-16T10:30:00.000Z"
  }
}
```

### 3. Créer un paiement Stripe
**POST** `/pay`

```json
{
  "amount": 120.50
}
```

**Réponse:**
```json
{
  "clientSecret": "pi_1234567890_secret_abcdefgh"
}
```

## 💰 Formule de tarification

```
Prix = Base (3€) + (Distance × Taux/km) + (Durée × 0.45€/min)
  + Surcharge montagne (15€) si isMountain
  + Surcharge ski (5€) si skiOption
```

**Taux par km:**
- Route normale: 1.8€/km
- Montagne: 2.2€/km

## 🔔 Notifications

Les notifications push sont envoyées aux chauffeurs sur le topic `chauffeur` via Firebase Cloud Messaging lorsqu'une nouvelle course est créée.

## 🗄️ Base de données

Structure de la table `rides`:
- `id` : Identifiant unique
- `pickup_address` : Adresse de départ
- `dropoff_address` : Adresse d'arrivée
- `distance_km` : Distance en kilomètres
- `duration_min` : Durée en minutes
- `passengers` : Nombre de passagers
- `luggage` : Nombre de bagages
- `price` : Prix de la course
- `payment_method` : Méthode de paiement (online / on_board)
- `status` : État de la course
- `created_at` : Date de création

## 📦 Dépendances

- **express** : Framework web
- **cors** : Gestion du CORS
- **stripe** : Intégration paiements
- **firebase-admin** : Notifications et services backend

## 📝 License

MIT