import { api } from './api'

export const getAllImages = async (q, page) => {
    
	const { data } = await api(`?q=${q}&page=${page}&key=40417349-5adf1a8a05d4c60245a4488c5&image_type=photo&orientation=horizontal&per_page=12`)
    return data
}