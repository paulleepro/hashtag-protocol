class HashtagValidationService {
  constructor(buefyToast) {
    this.buefyToast = buefyToast;
  }

  dangerToast(message) {
    this.buefyToast.open({
      duration: 5000,
      message,
      position: "is-bottom",
      type: "is-danger",
    });
  }

  validateTag(hashtag) {
    const value = hashtag && hashtag.name ? hashtag.name : hashtag;
    if (value.length < 3) {
      this.dangerToast(
        `Sorry, but '${value}' is an invalid tag as it's less than 3 characters long.`
      );
      return false;
    }

    if (value.length > 32) {
      this.dangerToast(
        `Sorry, but '${value}' is an invalid tag as it's more than 15 characters long.`
      );
      return false;
    }

    if (!/^#*\d*[a-zA-Z][a-zA-Z0-9]*$/.test(value)) {
      this.dangerToast(
        `Sorry, but '${value}' is an invalid tag as it's either not alpha numeric or only numeric.`
      );
      return false;
    }

    return true;
  }
}

export default HashtagValidationService;
