import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class BugService {
  async getAllBugs(query = {}) {
    return await dbContext.Bugs.find(query).populate("creator", "name picture")
  }

  async getAllNotesByBugId(bug) {
    return await dbContext.Notes.find({ bug }).populate("creator", "name picture")
  }

  async getById(id, userEmail) {
    let data = await dbContext.Bugs.findOne({ _id: id })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Bugs.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: userEmail, closed: false }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Bugs.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }

}


export const bugService = new BugService()