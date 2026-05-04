nvm use 20

⭐ PCF React Component – Complete Setup & Build Manual
(Node 20 + .NET 8/10 + Fluent UI v8 + PAC CLI)
This guide documents the exact working process for creating, building, packaging, and importing a Power Apps PCF component using React.

It reflects the real-world behavior of PAC CLI, including the folder‑level quirks you discovered.

1. Prerequisites
✔ Node.js
Use Node 20 (Power Apps supports Node 20 for PCF).

✔ .NET SDK
Use .NET 8 or .NET 10 (both work with modern PAC CLI).

✔ Power Platform CLI
Installed via:

Code
dotnet tool install --global Microsoft.PowerApps.CLI.Tool
✔ Fluent UI version awareness
Power Apps supports:

Fluent UI v8

NOT Fluent UI v9

This is critical.

2. Create the Top-Level Project Folder
Create a clean folder in your Documents directory:

Code
Documents/TopProjectFolder
Inside this folder, you will create:

The PCF component project

The solution project (one level below)

This structure avoids conflicts with other folders.

3. Create the PCF Component
Navigate into the top folder:

Code
cd Documents/TopProjectFolder
Run the PCF boilerplate generator:

Code
pac pcf init -n ReactComponent -ns ReactComponentNamespace -t field -fw react -npm
This creates:

Code
TopProjectFolder/
  ReactComponent/
    ControlManifest.Input.xml
    ReactComponent.pcfproj
    index.ts
    ReactComponent.tsx
    generated/
Then install dependencies:

Code
npm install
Add any libraries you need (SweetAlert, animate.css, etc.):

Code
npm install sweetalert2 animate.css
4. Build & Test the Component Locally
Build:
Code
npm run build
Test in harness:
Code
npm start watch
This opens the PCF test harness where you can interact with your component.

5. Create the Solution Project
Inside the component folder:

Code
cd ReactComponent
mkdir ReactComponentSolution
cd ReactComponentSolution
Initialize the solution:

Code
pac solution init --publisher-name KrakatoomDev --publisher-prefix kraka
This creates:

Code
ReactComponentSolution/
  ReactComponentSolution.cdsproj
  Other/
  Solution.xml
6. Add the PCF Project Reference (Important Quirk)
This is the part where PAC CLI behaves unexpectedly.

You must run the reference command from inside the solution folder,
but the --path must point to the parent folder, not the component folder.

Navigate to:

Code
cd Documents/TopProjectFolder/ReactComponent/ReactComponentSolution
Run:

Code
pac solution add-reference --path "C:\Users\gaude\Documents\TopProjectFolder"
Why this works
PAC CLI scans the folder recursively and finds the .pcfproj inside:

Code
TopProjectFolder/ReactComponent/ReactComponent.pcfproj
Running the command with the path set to the component folder itself may fail depending on naming and PAC CLI version.

7. Build the Solution (Generate ZIP Files)
From inside the solution folder:

Code
dotnet build -c Release
This produces:

Code
bin/Release/ReactComponentSolution.zip
bin/Release/ReactComponentSolution_managed.zip
These ZIPs contain:

The Dataverse solution metadata

The compiled PCF control

All required resources

ZIP size may be small (e.g., 4 KB) due to compression — this is normal.

8. Import into Power Apps
Go to:

Power Apps → Solutions → Import

Upload:

ReactComponentSolution.zip (unmanaged)
or

ReactComponentSolution_managed.zip (managed)

After import, your component appears under:

Insert → Code Components → ReactComponent

You can now use it inside Canvas Apps.

9. Key Notes & Best Practices
✔ You only run pac solution add-reference once
The reference is stored in the .cdsproj.

✔ Always use Fluent UI v8
Power Apps does not support Fluent UI v9.

✔ Node 20 + .NET 8/10 is the correct modern setup
Matches Microsoft’s current PCF documentation.

✔ Folder structure matters
The solution must be inside the component folder.
The reference path must point to the parent folder.

✔ Harness testing is optional but recommended
npm start watch is the fastest way to debug.
# ⭐ PCF React Component – Complete Setup & Build Manual
(Node 20 + .NET 8/10 + Fluent UI v8 + PAC CLI)

This guide documents the exact working process for creating, building, packaging, and importing a Power Apps PCF component using React.  
It reflects the real behavior of PAC CLI, including the folder‑level quirks discovered during development.

---

## 1. Prerequisites

### ✔ Node.js  
Use **Node 20**.

### ✔ .NET SDK  
Use **.NET 8 or .NET 10**.

### ✔ Power Platform CLI  
Install via:

```bash
dotnet tool install --global Microsoft.PowerApps.CLI.Tool
```

### ✔ Fluent UI version awareness  
Power Apps supports:

- **Fluent UI v8**
- ❌ NOT Fluent UI v9

---

## 2. Create the Top-Level Project Folder

```
Documents/TopProjectFolder
```

Inside this folder, you will create:

- The PCF component project  
- The solution project (one level below)

---

## 3. Create the PCF Component

Navigate into the top folder:

```bash
cd Documents/TopProjectFolder
```

Generate the PCF boilerplate:

```bash
pac pcf init -n ReactComponent -ns ReactComponentNamespace -t field -fw react -npm
```

This creates:

```
TopProjectFolder/
  ReactComponent/
    ControlManifest.Input.xml
    ReactComponent.pcfproj
    index.ts
    ReactComponent.tsx
    generated/
```

Install dependencies:

```bash
npm install
```

Add any libraries you need:

```bash
npm install sweetalert2 animate.css
```

---

## 4. Build & Test the Component Locally

Build:

```bash
npm run build
```

Test in harness:

```bash
npm start watch
```

---

## 5. Create the Solution Project

```bash
cd ReactComponent
mkdir ReactComponentSolution
cd ReactComponentSolution
```

Initialize the solution:

```bash
pac solution init --publisher-name KrakatoomDev --publisher-prefix kraka
```

This creates:

```
ReactComponentSolution/
  ReactComponentSolution.cdsproj
  Other/
  Solution.xml
```

---

## 6. Add the PCF Project Reference (Important Quirk)

Navigate to the solution folder:

```bash
cd Documents/TopProjectFolder/ReactComponent/ReactComponentSolution
```

Run:

```bash
pac solution add-reference --path "C:\Users\gaude\Documents\TopProjectFolder"
```

PAC CLI scans the folder recursively and finds:

```
TopProjectFolder/ReactComponent/ReactComponent.pcfproj
```

---

## 7. Build the Solution (Generate ZIP Files)

```bash
dotnet build -c Release
```

This produces:

```
bin/Release/ReactComponentSolution.zip
bin/Release/ReactComponentSolution_managed.zip
```

ZIP size may be small (e.g., 4 KB) due to compression — this is normal.

---

## 8. Import into Power Apps

Go to:

**Power Apps → Solutions → Import**

Upload:

- `ReactComponentSolution.zip` (unmanaged)
- `ReactComponentSolution_managed.zip` (managed)

Your component appears under:

**Insert → Code Components → ReactComponent**

---

## 9. Key Notes & Best Practices

- ✔ You only run `pac solution add-reference` once  
- ✔ Always use Fluent UI v8  
- ✔ Node 20 + .NET 8/10 is the correct modern setup  
- ✔ Folder structure matters  
- ✔ Harness testing recommended (`npm start watch`)
