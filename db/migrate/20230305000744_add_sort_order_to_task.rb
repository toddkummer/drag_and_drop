class AddSortOrderToTask < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :sort_order, :integer, default: 0
  end
end
