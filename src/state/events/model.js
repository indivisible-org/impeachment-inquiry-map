const campaignMapping = {
  15: 'local-actions',
  19: 'mobilizeamerica-public-events',
  21: 'save-scotus-actions',
  9: 'recess-townhall',
};

export default class IndEvent {
  constructor(props) {
    Object.assign(this, props);
    this.rsvpHref = this.makeUrl();
  }

  makeUrl() {
    return `http://act.impeachmentaugust.org/event/attend-impeachment-august/${this.id}`;
  }
}
