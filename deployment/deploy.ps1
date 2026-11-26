param([switch]$Production)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Push-Location $projectRoot
try {
    $linkPath = Join-Path $projectRoot '.vercel/project.json'
    if (-not (Test-Path -LiteralPath $linkPath)) {
        throw 'Link this repository to the existing GUPT Vercel project first. See deployment/README.md.'
    }
    $projectLink = Get-Content -LiteralPath $linkPath -Raw | ConvertFrom-Json
    if ($projectLink.projectId -ne 'prj_YoMT7GlOJYf13cUMIrlQubehZ5bq' -or $projectLink.orgId -ne 'team_sDzcJ2lbEYfAXiy2LXAJFQuo') {
        throw 'The local Vercel link does not match the GUPT project and team.'
    }
    foreach ($task in @('test', 'lint', 'build')) {
        & npm.cmd run $task
        if ($LASTEXITCODE -ne 0) { throw "Project check failed: $task" }
    }
    $deployArguments = @('deploy')
    if ($Production) { $deployArguments += '--prod' }
    & vercel @deployArguments
    if ($LASTEXITCODE -ne 0) { throw 'Vercel deployment failed.' }
} finally {
    Pop-Location
}
