class TodoList < ApplicationRecord
  has_many :tasks, -> { order(:sort_order) }, dependent: :destroy
  accepts_nested_attributes_for :tasks, allow_destroy: true, reject_if: proc { |attr| attr['description'].blank? }
end
