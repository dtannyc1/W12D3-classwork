class User < ApplicationRecord
    has_secure_password
    validates(:username, :email, :session_token, presence: true, uniqueness: true)
    validates(:username, length: {in: 3..30})
    validates(:email, length: {in: 3..255})
    validates(:email, format: { with: URI::MailTo::EMAIL_REGEXP })
    validates(:username, format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be email" })
    validates(:password, length: {in: 6..255}, allow_nil: true)
    before_validation(:ensure_session_token)

    def self.find_by_credentials(credential, password)
        email_regex = URI::MailTo::EMAIL_REGEXP
        if (email_regex.match(credential))
            user = User.find_by(email: credential)
        else
            user = User.find_by(username: credential)
        end

        if !user
            return nil
        else
            return user.authenticate(password)
        end
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        return self.session_token
    end

    private

    def generate_unique_session_token
        while (true)
            token = SecureRandom::urlsafe_base64
            if (!User.exists?(session_token: token))
                return token
            end
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token;
    end

end
