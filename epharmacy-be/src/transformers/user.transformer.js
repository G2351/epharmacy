const Transformer = require("../core/transformer")

class UserTransformer extends Transformer {
  response(instance) {
    return {
      id: instance.id,
      name: instance.name,
      email: instance.email,
      status: instance.status,
      createdAt: instance.created_at,
      updatedAt: instance.updated_at,
    }
  }
}

module.exports = UserTransformer
