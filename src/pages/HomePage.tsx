import '../data/styles.scss';

const HomePage = () => (
  <section className="section">
    <div className="container">
      <h1 className="title">Rick and Morty</h1>
      <p className="text">
        { 'Rick and Morty is an American adult animated science fiction sitcom created by Justin Roiland and '
            + "Dan Harmon for Cartoon Network's nighttime programming block Adult Swim. The series follows the "
            + 'misadventures of cynical mad scientist Rick Sanchez and his good-hearted, but fretful grandson Morty '
            + 'Smith, who split their time between domestic life and interdimensional adventures.' }
      </p>
      <p className="text">
        { 'Roiland voices the eponymous characters, with Chris Parnell, Spencer Grammer and Sarah Chalke voicing '
            + "the rest of Rick and Morty's family. The series originated from an animated short parody film of Back "
            + 'to the Future, created by Roiland for Channel 101, a short-film festival co-founded by Harmon. Since '
            + 'its debut, the series has received critical acclaim for its originality, creativity and humor.' }
      </p>
      <p className="text">
        The fifth season premiered on June 20, 2021, and consisted of ten episodes. A sixth season was confirmed as
        part of a long-term deal in May 2018 that ordered 70 new episodes over an unspecified number of seasons.
      </p>
    </div>
  </section>
);

export default HomePage;
