class CollectionNav extends HTMLElement {
  constructor() {
    super();
    this.navItems = this.querySelectorAll('[data-plp-nav-item]');
    this.navSelect = this.querySelector('[data-nav-select]');
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.navItems.forEach((navItem) => {
      navItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (!e.target.classList.contains('header__active-menu-item')) {
          this.updateActiveItem(e.target);
          FacetFiltersForm.renderSectionFromFetch(e.target.href, null);
        }
      });
    });
    this.navSelect.addEventListener('input', (e) => {
      e.preventDefault();
      this.updateActiveItem();
      FacetFiltersForm.renderSectionFromFetch(this.navSelect.value, null);
    });
  }

  updateActiveItem(activeItem=null) {
    if (activeItem) {
      history.pushState({}, '', activeItem.href);
      this.navItems.forEach((item, index) => {
        if (item == activeItem) {
          this.navSelect.selectedIndex = index;
          item.classList.add('header__active-menu-item');
        } else
          item.classList.remove('header__active-menu-item');
      })
    } else {
      history.pushState({}, '', this.navSelect.value);
      this.navItems.forEach((item, index) => {
        if (index == this.navSelect.selectedIndex)
          item.classList.add('header__active-menu-item');
        else
          item.classList.remove('header__active-menu-item');
      })
    }
  }
}

customElements.define('collection-nav', CollectionNav);