import * as request from 'request';

export const asyncRequest = async (value) => {
	return new Promise((resolve, reject) => {
		 request(value, (error, response, data) => {
			if(error) reject(error)
			else resolve({response, data})
			})
		   })
  }