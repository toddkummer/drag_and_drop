# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
list = TodoList.create!(name: 'Roy G Biv')

%w[Red Orange Yellow Green Blue Indigo Violet].each_with_index do |color, index|
  list.tasks.create!(description: color, sort_order: index)
end
