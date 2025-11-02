document.addEventListener("DOMContentLoaded", () => {
  const colorDivs = document.querySelectorAll(".image-change-div");
  const productImage = document.querySelector("#main-product-image");
  const defaultSrc = productImage.src;

  colorDivs.forEach((div) => {
    const newImage = `/images/product/${div.dataset.image}`;

    div.addEventListener("mouseenter", () => {
      productImage.src = newImage;
    });

    div.addEventListener("mouseleave", () => {
      productImage.src = defaultSrc;
    });
  });
});
