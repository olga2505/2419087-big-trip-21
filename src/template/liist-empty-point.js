
function createLiistEmptyPoint({text}) {
  return (
    `<section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
      <p class="trip-events__msg">${text}</p>
    </section>`
  );
}

export {createLiistEmptyPoint};
