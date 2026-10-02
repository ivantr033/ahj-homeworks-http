const BACKEND_URL = 'http://localhost:3000';

const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('hidden-file-input');
const gallery = document.getElementById('images-preview-gallery');

// 📥 1. ОТОБРАЖЕНИЕ ВСЕХ ФАЙЛОВ С СЕРВЕРА (GET /files)
async function loadUploadedImages() {
    try {
        const response = await fetch(`${BACKEND_URL}/files`);
        if (!response.ok) throw new Error('API server unreachable');
        const data = await response.json();
        renderGallery(data.files || []);
    } catch (err) {
        console.error('Error fetching image repository:', err);
    }
}

// 🎨 РЕНДЕРИНГ ГАЛЕРЕИ С КРЕСТИКАМИ (FOTO 6)
function renderGallery(filesList) {
    gallery.innerHTML = '';

    filesList.forEach(file => {
        const card = document.createElement('div');
        card.className = 'image-preview-card animate-scale-up';
        card.dataset.id = file.id;

        card.innerHTML = `
      <img src="${file.path}" alt="${file.filename}" />
      <button class="delete-image-btn" title="Удалить изображение">×</button>
    `;

        // ❌ УДАЛЕНИЕ КАРТИНКИ С СЕРВЕРА (DELETE /files/<id>)
        card.querySelector('.delete-image-btn').addEventListener('click', async (e) => {
            e.stopPropagation();
            try {
                const delRes = await fetch(`${BACKEND_URL}/files/${file.id}`, {
                    method: 'DELETE'
                });
                if (delRes.status === 204 || delRes.ok) {
                    card.remove();
                    loadUploadedImages();
                }
            } catch (err) {
                console.error('Error deleting binary file:', err);
            }
        });

        gallery.appendChild(card);
    });
}

// 🚀 2. ОТПРАВКА БИНАРНОГО ФАЙЛА НА СЕРВЕР (POST /files С ИСПОЛЬЗОВАНИЕМ FORMDATA)
async function uploadBinaryFile(file) {
    if (!file || !file.type.startsWith('image/')) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${BACKEND_URL}/files`, {
            method: 'POST',
            body: formData
        });

        if (response.status === 201 || response.ok) {
            loadUploadedImages();
        }
    } catch (err) {
        console.error('Error uploading image to Express:', err);
    }
}

// 🎯 3. ЛОГИКА NATIVE DRAG AND DROP
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        uploadBinaryFile(files[0]);
    }
});

// 🖱️ 4. ЛОГИКА КЛИКА ПО ЗОНЕ
dropZone.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        uploadBinaryFile(fileInput.files[0]);

        fileInput.value = '';
    }
});

document.addEventListener('DOMContentLoaded', loadUploadedImages);
