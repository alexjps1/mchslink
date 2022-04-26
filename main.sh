# Interrupt sequence
trap cleanup INT
function cleanup() {
    echo "[!] Script interrupted"
    pkill ${BROWSER}
    rm actions/*
    rm workspace/*
    echo "[ ] Cleared workspace"
    echo "[ ] Goodbye!"
    echo "TIP: Run manage.sh to copy/move/delete archived data"
    exit
}

# Main loop
while :
do
    echo "[ ] Waiting for new picture"

    while :
    do
        # Check for file in workspace directory
        [[ $(ls workspace) ]] && echo "[ ] New picture detected" && break
        sleep 0.5
    done

    while :
    do
        # Gen random code
        CODE=$(shuf -n 1 -i 1000-9999)
        echo "[ ] Code ${CODE} generated"

        # Regen if pic with code already existing online or in archive
        wget "${LINK}/${CODE}" &> /dev/null && echo "[!] Code already in use" && continue
        [[ $(ls archive/images | grep ${CODE}) ]] && echo "[!] Code already in use" && continue
        echo "[ ] Code verified as unique"
        break
    done

    # Rename file to its code
    mv workspace/output.png workspace/${CODE}.png
        
    # Generate QR code
    qr "${LINK}/${CODE}" > workspace/qr.png

    # Clear out workspace directory so it's ready for next time
    rm workspace/*
    echo "[ ] Cleared workspace"

done