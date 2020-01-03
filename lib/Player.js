class Player {
  constructor(data) {
    this.data = data
    this.tag = data.tag
    this.name = data.name
    this.nameColor = data.nameColor
    this.trophies = data.trophies
    this.expLevel = data.level
    this.expPoints = data.expPoints
    this.highestTrophies = data.highestTrophies
    this.powerPlayPoints = data.powerPlayPoints
    this.highestPowerPlayPoints = data.highestPowerPlayPoints
    this.trioVictories = data['3vs3Victories']
    this.duoVictories = data.duoVictories
    this.soloVictories = data.soloVictories
    this.totalWins = parseInt(this.soloVictories + this.trioVictories + this.duoVictories)
    this.bestRoboRumbleTime = data.bestRoboRumbleTime
    this.bestTimeAsBigBrawler = data.bestTimeAsBigBrawler
    this.isQualifiedFromChampionshipChallenge = data.isQualifiedFromChampionshipChallenge
    this.brawlers = data.brawlers
    this.brawlersCount = data.brawlers.length
    this.club = data.club
  }

  /** 
  * @param {string} type trio, duo or solo
  * @return {number}
  */

  getWins(type) {
    return !this[type+"Victories"] ? error("Invalid type, try: trio, duo, solo") : parseInt(this[type+"Victories"])
  }

  /**
  * @description gives player's nameColor
  * @returns {string}
  */

  getColor() {
    return this.nameColor.replace("0xff", "")
  }


  /**
  * @param {string} name brawler name
  * @description get player's brawler by NAME
  * @returns false if the player doesn't have the brawler - object if the player have the brawler
  */

  getBrawlerByName(name) {
    let brawlerByName = this.brawlers.filter(x => x.name == name.toUpperCase())
    return brawlerByName.length > 0 ? brawlerByName : false
  }

  /**
  * @param {string} id brawler ID
  * @description get player's brawler by ID
  * @returns false if the player doesn't have the brawler - object if the player have the brawler
  */

  getBrawlerById(id) {
    let brawlerById = this.brawlers.filter(x => x.id == id)
    return brawlerById ? brawlerById : false
  }

  /**
  * @returns list of player's starpowers names
  */

  getStarPowersNames() {
    let x = []
    for (let i = 0; i < this.brawlers.length; i++) {
      if (this.brawlers[i].starPowers.length > 0) x.push(this.brawlers[i].starPowers.map(b => b.name))
    }

    return x 
  }

  /**
  * @returns list of player's starpowers IDs
  */

  getStarPowersId() {
    let x = []
    for (let i = 0; i < this.brawlers.length; i++) {
      if (this.brawlers[i].starPowers.length > 0) x.push(this.brawlers[i].starPowers.map(b => b.id))
    }

    return x 
  }

  /**
  * @param {string} name robotRumble or bigBrawler
  * @description convert robot rumble or big brawler timestamp to text
  * @returns {string}
  */

  bestTimeToTxt(name) {
    let timestamp = name == "robotRumble" ? this.bestRoboRumbleTime : this.bestTimeAsBigBrawler
    return convertTime(timestamp)
  }

  /**
   * @description sort player's brawlers by trophies
   * @returns {object} Object
   */

  sortBrawlersByTrophies() {
      return this.brawlers.sort((a, b) => a.trophies - b.trophies)
  }

  /**
  * @description sort player's brawlers by Highest trophies
  * @returns {object} Object
  */

  sortBrawlersByHighestTrophies() {
      return this.brawlers.sort((a, b) => a.highestTrophies - b.highestTrophies)
  }

  /**
   * @description sort player's brawlers by power level
   * @returns {object} object
   */

  sortBrawlersByPower() {
    return this.brawlers.sort((a, b) => a.power - b.power)
  }

  /**
   * @description sort player's brawlers by rank
   * @returns {object} object
   */

  sortBrawlersByRank() {
    return this.brawlers.sort((a, b) => a.rank - b.rank)
  }
}

function error(txt) {
    return TypeError(txt)
}

function convertTime(timestamp) {
    sc = timestamp%60
    return `${((timestamp-sc)/60)}m${sc}s`
}

module.exports = Player