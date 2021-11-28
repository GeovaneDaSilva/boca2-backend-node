import { CategoryModel } from "../../entities/category";

export interface AddCategoryModel {
  name: string
  Category?: any
  description: string
  created_date: Date
  activated_dates?: any

}
export interface AddCategory {
  add: (category: CategoryModel) => Promise<AddCategoryModel>
}

export interface ListCategory {
    get: (category_id?: CategoryModel) => Promise<AddCategoryModel>
}

export interface EditCategory {
  edit: (category_id: string, body: CategoryModel) => Promise<AddCategoryModel>
}

export interface DeleteCategory {
  delete: (category_id: CategoryModel) => Promise<AddCategoryModel>
}