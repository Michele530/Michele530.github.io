@echo off
REM Script d'automatisation Git simple

REM Change le message de commit ici si tu veux
set COMMIT_MSG=Auto commit

REM Chemin vers git.exe portable, adapte si besoin
set GIT_PATH=C:\Users\ETU\Desktop\HyperClips\PortableGit\bin\git.exe

REM Ajoute tous les fichiers modifiés
"%GIT_PATH%" add .

REM Commit avec message
"%GIT_PATH%" commit -m "%COMMIT_MSG%"

REM Push sur la branche main (adapté à ton remote)
"%GIT_PATH%" push -u origin main

pause
