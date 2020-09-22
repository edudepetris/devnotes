require 'test_helper'

class NoteTest < ActiveSupport::TestCase
  def setup
    @note = notes(:one)
  end

  test 'valid note' do
    assert @note.valid?
  end

  test 'invalid without content' do
    @note.content = nil
    assert_not @note.valid?
  end

  test 'invalid without project name' do
    @note.project_name = nil
    assert_not @note.valid?
  end

  test 'invalid with same project name' do
    n2 = @note.dup
    assert_not n2.valid?
    assert_not_nil n2.errors[:project_name]
  end
end
