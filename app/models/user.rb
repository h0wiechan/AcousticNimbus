class User < ApplicationRecord
  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  has_many :songs
  has_many :likes

  has_many :attention, {
    foreign_key: :followed_user_id,
    class: :Follow,
  }
  has_many :followers, {
    through: :attention,
    source: :User
  }

  has_many :interests, {
    foreign_key: :follower_id,
    class: :Follow,
  }
  has_many :followings, {
    through: :interests,
    source: :User
  }

  after_initialize :ensure_session_token!
  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  private

  def ensure_session_token!
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end
