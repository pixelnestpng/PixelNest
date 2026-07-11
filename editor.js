document.addEventListener("DOMContentLoaded", function () {

    const uploadBtn = document.getElementById("uploadBtn");
    const imageInput = document.getElementById("imageInput");

    const uploadSection = document.querySelector(".upload-section");
    const editor = document.getElementById("editor");

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const downloadBtn = document.getElementById("downloadBtn");

    let currentImage = null;

    // فتح اختيار الصورة
    uploadBtn.addEventListener("click", function () {

        imageInput.click();

    });

    // بعد اختيار الصورة
    imageInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            const img = new Image();

            img.onload = function () {

                currentImage = img;

                document.querySelector(".upload-box").style.display = "none";
                editor.style.display = "block";

                drawImage("16:9");

            }

            img.src = e.target.result;

        }

        reader.readAsDataURL(file);

    });

    // رسم الصورة
    function drawImage(ratio) {

        let width, height;

        switch (ratio) {

            case "16:9":
                width = 1280;
                height = 720;
                break;

            case "9:16":
                width = 720;
                height = 1280;
                break;

            case "1:1":
                width = 1000;
                height = 1000;
                break;

            case "4:5":
                width = 800;
                height = 1000;
                break;

            default:
                width = 1280;
                height = 720;

        }

        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        if (!currentImage) return;

        const scale = Math.min(
            width / currentImage.width,
            height / currentImage.height
        );

        const imgWidth = currentImage.width * scale;
        const imgHeight = currentImage.height * scale;

        const x = (width - imgWidth) / 2;
        const y = (height - imgHeight) / 2;

        ctx.drawImage(currentImage, x, y, imgWidth, imgHeight);

    }

    // أزرار المقاسات
    document.querySelectorAll(".ratio-buttons button").forEach(button => {

        button.addEventListener("click", function () {

            drawImage(this.dataset.ratio);

        });

    });

    // تحميل الصورة
    downloadBtn.addEventListener("click", function () {

        const link = document.createElement("a");

        link.download = "PixelNest.png";

        link.href = canvas.toDataURL("image/png");

        link.click();

    });

});