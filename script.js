// Ambil elemen DOM
const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const cells = document.querySelectorAll('.cell'); // Ambil semua sel

// Variabel state permainan
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""]; // Array untuk menyimpan status papan (0-8)
let gameActive = true;

// Kombinasi pemenang
const winningConditions = [
    [0, 1, 2], // Baris 1
    [3, 4, 5], // Baris 2
    [6, 7, 8], // Baris 3
    [0, 3, 6], // Kolom 1
    [1, 4, 7], // Kolom 2
    [2, 5, 8], // Kolom 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
];

// Pesan status
const winningMessage = () => `Pemain ${currentPlayer} Menang! 🎉`;
const drawMessage = () => `Permainan Seri! 🤝`;
const currentPlayerTurn = () => `Giliran ${currentPlayer}`;

// Inisialisasi Tampilan Status Awal
statusDisplay.textContent = currentPlayerTurn();

// Fungsi untuk menangani klik pada sel
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Cek apakah sel sudah diisi atau permainan sudah berakhir
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return; // Keluar jika tidak valid
    }

    // Proses langkah pemain
    handleCellPlayed(clickedCell, clickedCellIndex);
    // Periksa hasil setelah langkah
    handleResultValidation();
}

// Fungsi untuk menandai sel yang dimainkan
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer; // Update state internal
    clickedCell.textContent = currentPlayer;     // Update tampilan sel
    clickedCell.classList.add(currentPlayer.toLowerCase()); // Tambah kelas .x atau .o untuk styling
}

// Fungsi untuk memeriksa pemenang atau seri
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        // Ambil nilai state dari 3 sel dalam kondisi menang
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        // Jika salah satu kosong, kondisi ini belum terpenuhi
        if (a === '' || b === '' || c === '') {
            continue;
        }
        // Jika ketiganya sama, ada pemenang
        if (a === b && b === c) {
            roundWon = true;
            break; // Keluar loop karena sudah ada pemenang
        }
    }

    // Jika ada pemenang
    if (roundWon) {
        statusDisplay.textContent = winningMessage();
        gameActive = false; // Nonaktifkan permainan
        return;
    }

    // Jika tidak ada pemenang, cek apakah seri
    let roundDraw = !gameState.includes(""); // Seri jika tidak ada sel kosong lagi
    if (roundDraw) {
        statusDisplay.textContent = drawMessage();
        gameActive = false; // Nonaktifkan permainan
        return;
    }

    // Jika permainan berlanjut, ganti pemain
    handlePlayerChange();
}

// Fungsi untuk mengganti giliran pemain
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Ganti pemain
    statusDisplay.textContent = currentPlayerTurn(); // Update status giliran
}

// Fungsi untuk memulai ulang permainan
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""]; // Kosongkan state
    statusDisplay.textContent = currentPlayerTurn(); // Reset status

    // Kosongkan tampilan sel dan hapus kelas x/o
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x');
        cell.classList.remove('o');
    });
}

// Tambahkan event listener
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);

console.log("Game Tic Tac Toe siap dimainkan!");
