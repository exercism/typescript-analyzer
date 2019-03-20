import fs from 'fs'

import { Comment } from './comment'

export type SolutionStatus = 'refer_to_mentor' | 'approve_as_optimal' | 'approve_with_comment' | 'disapprove_with_comment'

export class AnalyzerOutput {
  public status: SolutionStatus
  public comments: Comment[]

  constructor() {
    this.status = "refer_to_mentor"
    this.comments = []
  }

  public approve() {
    this.status = this.comments.length === 0 ? "approve_as_optimal" : "approve_with_comment"
  }

  public disapprove() {
    this.status = "disapprove_with_comment"
  }

  public redirect() {
    this.status = "refer_to_mentor"
  }

  public add(comment: Comment) {
    this.comments.push(comment)
    return this
  }

  public toString(): string {
    // Currently we want strings, but change to the following if that's fixed:
    return JSON.stringify({
      status: this.status,
      comments: this.comments.map((comment) =>
        !comment.variables
          ? comment.message
          : { comment: comment.template, variables: comment.variables }
      )
    }, null, 2)
  }

  public writeTo(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, this.toString(), (err) => {
        err ? reject(err) : resolve()
      })
    })
  }
}
