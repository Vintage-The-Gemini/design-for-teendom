# File: move-assets-to-backend.ps1
# PowerShell script to organize all assets in the backend

Write-Host "🚀 ORGANIZING TEENDOM ASSETS" -ForegroundColor Green
Write-Host "Moving documents and images to backend..." -ForegroundColor Yellow

# Get current directory (should be run from project root)
$projectRoot = Get-Location
Write-Host "📁 Project root: $projectRoot" -ForegroundColor Cyan

# Define paths
$backendPath = Join-Path $projectRoot "backend"
$frontendAssetsPath = Join-Path $projectRoot "frontend\src\assets"

# Create backend directories
$backendDocs = Join-Path $backendPath "docs"
$backendImages = Join-Path $backendPath "public\images"
$backendUploads = Join-Path $backendPath "uploads"

Write-Host "📂 Creating backend directories..." -ForegroundColor Yellow

# Create directories if they don't exist
@($backendDocs, $backendImages, $backendUploads) | ForEach-Object {
    if (!(Test-Path $_)) {
        New-Item -ItemType Directory -Path $_ -Force
        Write-Host "✅ Created: $_" -ForegroundColor Green
    } else {
        Write-Host "📁 Exists: $_" -ForegroundColor Blue
    }
}

# Function to copy files with progress
function Copy-WithProgress {
    param(
        [string]$Source,
        [string]$Destination,
        [string]$Description
    )
    
    if (Test-Path $Source) {
        Write-Host "📋 $Description" -ForegroundColor Yellow
        Write-Host "   From: $Source" -ForegroundColor Gray
        Write-Host "   To: $Destination" -ForegroundColor Gray
        
        Copy-Item -Path $Source -Destination $Destination -Recurse -Force
        Write-Host "✅ Completed: $Description" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Source not found: $Source" -ForegroundColor Red
    }
}

# Move Word documents (adjust paths based on where your docs are)
Write-Host "`n📄 MOVING WORD DOCUMENTS..." -ForegroundColor Magenta

# Common locations for Word documents - adjust these paths
$possibleDocPaths = @(
    ".\documents\*.docx",
    ".\documents\*.doc", 
    ".\docs\*.docx",
    ".\docs\*.doc",
    ".\*.docx",
    ".\*.doc",
    "$env:USERPROFILE\Documents\Teendom\*.docx",
    "$env:USERPROFILE\Documents\Teendom\*.doc"
)

$foundDocs = @()
foreach ($path in $possibleDocPaths) {
    $docs = Get-ChildItem -Path $path -ErrorAction SilentlyContinue
    if ($docs) {
        $foundDocs += $docs
    }
}

if ($foundDocs.Count -gt 0) {
    Write-Host "📄 Found $($foundDocs.Count) Word documents:" -ForegroundColor Green
    foreach ($doc in $foundDocs) {
        Write-Host "   - $($doc.Name)" -ForegroundColor Cyan
        Copy-Item $doc.FullName -Destination $backendDocs
    }
} else {
    Write-Host "❗ No Word documents found in common locations." -ForegroundColor Yellow
    Write-Host "   Please manually copy your .docx/.doc files to: $backendDocs" -ForegroundColor Yellow
}

# Move images from frontend to backend
Write-Host "`n🖼️  MOVING IMAGES..." -ForegroundColor Magenta

if (Test-Path $frontendAssetsPath) {
    $imagesPath = Join-Path $frontendAssetsPath "images"
    if (Test-Path $imagesPath) {
        Copy-WithProgress -Source "$imagesPath\*" -Destination $backendImages -Description "Copying all images to backend"
    } else {
        Write-Host "⚠️  Images folder not found at: $imagesPath" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  Frontend assets not found at: $frontendAssetsPath" -ForegroundColor Yellow
}

# Create .gitkeep files to preserve empty directories
Write-Host "`n📝 Creating .gitkeep files..." -ForegroundColor Yellow
@($backendDocs, $backendImages, $backendUploads) | ForEach-Object {
    $gitkeep = Join-Path $_ ".gitkeep"
    if (!(Test-Path $gitkeep)) {
        New-Item -ItemType File -Path $gitkeep -Force | Out-Null
        Write-Host "✅ Created .gitkeep in $_" -ForegroundColor Green
    }
}

# List what we have now
Write-Host "`n📊 FINAL STRUCTURE:" -ForegroundColor Green
Write-Host "backend/" -ForegroundColor Cyan
Write-Host "├── docs/" -ForegroundColor Gray
if (Test-Path $backendDocs) {
    Get-ChildItem $backendDocs -File | ForEach-Object {
        Write-Host "│   ├── $($_.Name)" -ForegroundColor White
    }
}
Write-Host "├── public/" -ForegroundColor Gray
Write-Host "│   └── images/" -ForegroundColor Gray
if (Test-Path $backendImages) {
    Get-ChildItem $backendImages -Directory | Select-Object -First 5 | ForEach-Object {
        Write-Host "│       ├── $($_.Name)/" -ForegroundColor White
    }
    $imageCount = (Get-ChildItem $backendImages -Recurse -File).Count
    Write-Host "│       └── ($imageCount total images)" -ForegroundColor Gray
}

Write-Host "`n🎉 ORGANIZATION COMPLETE!" -ForegroundColor Green
Write-Host "`nNEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. cd backend" -ForegroundColor White
Write-Host "2. npm install mammoth multer" -ForegroundColor White  
Write-Host "3. Create the enhanced parser files" -ForegroundColor White
Write-Host "4. Run: node utils/updateArticlesWithEnhancedContent.js" -ForegroundColor White

# Check if specific documents exist
Write-Host "`n🔍 CHECKING FOR REQUIRED DOCUMENTS:" -ForegroundColor Magenta
$requiredDocs = @(
    "ACNE IN TEENAGE BOYS - Catherine Kinyanjui.docx",
    "COVER STORY_ BOYLAN SISTERS.docx", 
    "TEEN CEO.docx",
    "SAVINGS-Makenya.docx",
    "Boost Your Self-Esteem.docx",
    "Relationships.docx",
    "Body Odour.docx",
    "Bully proof.docx",
    "In their FootSteps.docx",
    "RIDE OR DIE- By Faith Bwari.doc"
)

$missingDocs = @()
foreach ($doc in $requiredDocs) {
    $docPath = Join-Path $backendDocs $doc
    if (Test-Path $docPath) {
        Write-Host "✅ Found: $doc" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing: $doc" -ForegroundColor Red
        $missingDocs += $doc
    }
}

if ($missingDocs.Count -gt 0) {
    Write-Host "`n⚠️  MISSING DOCUMENTS:" -ForegroundColor Yellow
    Write-Host "Please add these files to $backendDocs :" -ForegroundColor Yellow
    $missingDocs | ForEach-Object { Write-Host "   - $_" -ForegroundColor Red }
} else {
    Write-Host "`n🎉 All required documents found!" -ForegroundColor Green
}

Write-Host "`nScript completed! Check the output above for any missing files." -ForegroundColor Cyan