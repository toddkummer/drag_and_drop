class Task < ApplicationRecord
  default_scope { order(:sort_order) }
  belongs_to :todo_list
end
