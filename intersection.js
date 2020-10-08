const display = () => {
  let observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if(entry.intersectionRatio > 0.3) {
        entry.target.classList.remove('not-visible');
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: [0.3]
    }
  );

  let items = document.querySelectorAll('.card');
  items.forEach((item) => {
    item.classList.add('not-visible');
    observer.observe(item);
  })
}
