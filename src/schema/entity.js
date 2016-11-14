import Ajv from 'ajv'

// export default entitySchema = () => {
// 	{

// 	}
// }

 const entitySchema = {
	"properties": {
		"entityName": { "type": "string", "pattern": "^[A-Za-z_]+$", "minLength": 1, "maxLength": 20 },
		
		"attributes": {
			"type": "array",
			"maxItems": 25,
			"items": {
                "type": "object",
                "properties": {
                	"attributeName": { "type": "string", "pattern": "^[A-Za-z_]+$", "minLength": 1, "maxLength": 20 },
                	"attributeType": { "type": "string", "enum": ["Time", "Date", "String", "Numbers", "Characters"] }
                },
            "required": ["attributeName", "attributeType"]
            }
		}
	},
	"required": ["entityName", "attributes"]
}
export default entitySchema;