// function crteateDestinationPhotoTemplate({picture}) {
//   return `

//   `
// }

export const createPointEditDestinationTemplate = ({currentDestination}) => `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${currentDestination.description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${currentDestination.pictures.map(({src, desctiption}) => `
            <img class="event__photo" src=${src} alt=${desctiption}>
          `)}
        </div>
      </div>
    </section>
  `;


// export const createPointEditDestinationTemplate = ({currentDestination}) => `
//     <section class="event__section  event__section--destination">
//       <h3 class="event__section-title  event__section-title--destination">Destination</h3>
//       <p class="event__destination-description">${currentDestination.description}</p>
//       <div class="event__photos-container">
//         <div class="event__photos-tape">
//           ${currentDestination.pictures.map(({src, desctiption}) => `
//             <img class="event__photo" src=${src} alt=${desctiption}>
//           `)}
//         </div>
//       </div>
//     </section>
//   `;
