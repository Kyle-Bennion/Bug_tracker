import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { bugService } from '../services/BugService.js'



//PUBLIC
export class BugsController extends BaseController {
  constructor() {
    super("api/bugs")
    this.router
      .get('', this.getAllBugs)
      .use(auth0provider.getAuthorizedUserInfo)
      .get('/:id/notes', this.getAllNotesByBugId)
      .get('/:id', this.getById)
      .post('', this.createBug)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }


  async getAllBugs(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await bugService.getAllBugs(req.query)
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getAllNotesByBugId(req, res, next) {
    try {
      //only gets lists by user who is logged in
      let data = await bugService.getAllNotesByBugId(req.params.id)
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await bugService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await bugService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await bugService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await bugService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}
