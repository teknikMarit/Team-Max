class Carousel extends Base {

  async mount() {
    await this.getRandomObject();
  }

  async getRandomObject() {
    // Tar fram framsides bilder till alla objekt och de visas random.
    this.framsideBilder = await sql(/*sql*/`
      SELECT *  FROM ObjektBilder 
      WHERE framsidebild = 1
      ORDER BY random()
    `,);
  }

  render() {
    let toRender = /*html*/`
        <div class="col-12">
          <h2 class="serif mb-3">Ett urval av våra aktuella bostäder</h2>
          <div id="start-carousel" class="carousel slide bg-dark" data-ride="carousel">
            <ol class="carousel-indicators bg-secondary rounded">
              ${this.framsideBilder.map((framsideBilder, index) => /*html*/`
                <li data-target="#start-carousel" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>
              `)}
            </ol>
            <div class="carousel-inner">
              ${this.framsideBilder.map((framsideBilder, index) => /*html*/`
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                  <div class="d-flex justify-content-center">
                    <a href="/objekt-sida/${framsideBilder.objektId}"><img class="w-100 img-fluid" src="${framsideBilder.bildUrl}"></a>
                  </div>
                </div>
              `)}
            </div>
            <a class="carousel-control-prev" href="#start-carousel" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#start-carousel" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
    `;

    // start the carousel
    setTimeout(() => $('#start-carousel').carousel('cycle'));
    // start getting a new random category, in case we are shown again
    this.getRandomObject();
    // return the html to render
    return toRender;
  }

}