const campaignMapping = {
  15: 'local-actions',
  19: 'mobilizeamerica-public-events',
  21: 'save-scotus-actions',
  24: 'we-are-indivisible-2020-kickoff',
  27: 'impeachment-august',
  28: '2020-candidate-events',
  9: 'recess-townhall',
};
// 15, 9, 21, 24, 27, 28

export default class IndEvent {
  constructor(props) {
    Object.assign(this, props);
    this.rsvpHref = this.makeUrl();
  }

  makeUrl() {
    const arr = this.campaign.split('/');
    const campaignNumber = arr[arr.length - 2];
    const campaignName = campaignMapping[campaignNumber] || 'local-actions';
    return `https://act.impeachnow.org/event/${campaignName}/${this.id}`;
  }
}
