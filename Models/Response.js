/**
 * @swagger
 *  components:
 *    schemas:
 *      Response:
 *        type: object
 *        properties:
 *          success:
 *            type: boolean
 *          message:
 *            type: string
 *            description: A message response sent by the server
 *          data:
 *            type: object
 *            required: false
 *            description: Optional data passed back
 *        example:
 *           success: true
 *           message: Retrieved countries
 *           data : { country_names : ['Malta', 'Japan']}
 */
class Response {
    constructor(success, message, data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

module.exports = Response;