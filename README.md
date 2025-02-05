# Oscar Challenge

The Oscar Challenge is a web application developed using SAP UI5 and OData to manage Oscar awards for the Best Actor and Best Actress categories. The application provides an intuitive and efficient interface for listing, searching, creating, and editing award records.

![SAP UI5](https://img.shields.io/badge/SAP%20UI5-%230081CB.svg?style=for-the-badge&logo=sap&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Table of Contents

- [Oscar Challenge](#oscar-challenge)
  - [Table of Contents](#table-of-contents)
  - [📜 Prerequisites](#-prerequisites)
  - [🛠 How to Run](#-how-to-run)
  - [🎥 Video Demo](#-video-demo)
  - [🌟 Features](#-features)
  - [📑 Documentation](#-documentation)

## 📜 Prerequisites

- Install [node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- Install `npm add -g @sap/cds-dk`

## 🛠 How to Run

To run the application, you can simply run `npm run start` or `npm run start:ts`, both will work correctly.

> [!CAUTION]
>
> - Windows OS can have problems with node_modules path, if it happens, it's recommended to use `npm run start` to run the application.
> - If `npm run start` does not start with the .ts service, please run `npm run start:ts` it will force the application to use the .ts service.

## 🎥 Video Demo

https://github.com/user-attachments/assets/6c456c1a-000d-4110-945b-b812cf8cf369

## 🌟 Features

Core Features (From Challenge)
- [x] List of Oscar winners
- [x] Search by actor, movie, or category
- [x] Sorting by award year
- [x] Form to create new awards
- [x] Edit existing awards
- [x] Internationalization (i18n)

Additional Features Implemented
- [x] Toast notifications for success/error messages
- [x] Unit tests with QUnit
- [x] Improved routing
- [x] Documentation
- [x] UI enhancements for better responsiveness

## 📑 Documentation

### Architecture

#### Component-based Structure
The application follows the MVC (Model-View-Controller) pattern and is organized into distinct files and folders:

- app/controller/: Contains controllers managing UI logic.
- app/view/: Holds XML views defining UI layouts.
- app/model/: Manages data models.
- app/css/: Contains custom styling.
- app/: Houses the main Component.js, manifest.json, and the entry index.html.

#### Data Flow
The application retrieves, updates, and manages award data through OData v4 services:

Fetches awards, actors, films, and categories from an OData service.

Uses UI5 models to bind and structure data in views.

Implements event-based communication to update UI after data modifications.

## Core Components

### Component.js (Entry Point)
Initializes the UI5 application.

Loads the OData models for awards, actors, films, and categories.

Sets up i18n (internationalization) model.

Loads style.css dynamically.

Initializes the UI5 router for navigation.

### Manifest.json (Configuration & Routing)
Defines metadata, UI5 dependencies, and model configurations.

Configures routing using sap.m.routing.Router with defined routes:

- Main (Home Page)
- AwardForm (Award creation/editing page)
- Declares the data source (/odata/v4/oscar/).

### Main Controller (Main.controller.js)
Loads and manages winners' data, fetching award details with expanded actor, film, and category references.

Implements search functionality using UI5 filters.

Handles event-based updates when new awards are added.

Navigates to the award creation/editing screen.

### Award Form Controller (AwardForm.controller.js)
Handles award creation and editing.

Loads existing award data or initializes a new entry.

Performs API calls (fetch requests) for saving and updating awards.

Utilizes the EventBus to notify the application of changes.

### Models (models.js)
Provides helper methods to retrieve and create JSON models.

Retrieves UI5's i18n model for localization support.

## UI Implementation
### Main View (Main.view.xml)
Displays a searchable and clickable table of awards.

Uses SAP UI5 Table (sap.m.Table) with data binding to winnersDetailed model.

Allows users to navigate to the Award Form for editing or creating awards.

### Award Form View (AwardForm.view.xml)
Contains dropdowns for selecting actors, films, and categories.

Provides Save and Cancel buttons.

Uses UI5 VBox for form layout.

Binds form data to the award model.

## Key Features & Design Choices

### OData v4 Usage
The application consumes OData v4 services to interact with the backend.

Uses $expand for fetching related entities (actors, films, categories).

Implements CRUD operations via fetch.

### Event-driven Updates
Implements EventBus (AwardsChannel) to refresh data dynamically when a new award is added.

Avoids unnecessary API calls by updating only the relevant parts of the UI.

### Model Binding & Separation of Concerns
Uses JSONModel for UI state management.

Separates logic into reusable helper methods (models.js).

### Routing & Navigation

Implements pattern-based navigation (awardForm/:awardId:).

Uses sap.ui.core.UIComponent.getRouterFor() to navigate dynamically.

### Internationalization (i18n)

Uses an i18n model for language support.

Dynamically updates button labels and UI texts.

### Custom Styling (style.css)

Provides minor UI enhancements:

Custom bar background.

Bold headers.

Rounded buttons.

## External References

- SAP UI5 Documentation: https://sapui5.hana.ondemand.com/#/topic
- OData v4 Guide: https://sapui5.hana.ondemand.com/sdk/#/topic/bcdbde6911bd4fc68fd435cf8e306ed0
- SAP Routing and Navigation: https://sapui5.hana.ondemand.com/sdk/#/topic/3d18f20bd2294228acb6910d8e8a5fb5





