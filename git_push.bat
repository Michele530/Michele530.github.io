@echo off

cd /d C:\Users\ETU\Desktop\HyperClips\html

echo [Adding files]
"C:\Users\ETU\Desktop\HyperClips\PortableGit\bin\git.exe" add .

echo [Committing]
"C:\Users\ETU\Desktop\HyperClips\PortableGit\bin\git.exe" commit -m "Auto commit"

echo [Pushing]
"C:\Users\ETU\Desktop\HyperClips\PortableGit\bin\git.exe" push -u origin main
