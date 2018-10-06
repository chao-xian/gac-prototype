require 'uri'
require 'open-uri'
require 'nokogiri'
require 'rest-client'
require 'json'

# Read through JSON
# for each piece get the id
# use the search page
# find the image
# download it

LOG = Logger.new(STDOUT)

module GACRandomPicture
  def self.fetch(id)
    loop do
      # id = id
      url = "https://www.gac.culture.gov.uk/gacdb/search.php?mode=show&id=#{id}"

      LOG.info "Trying: #{url}"

      begin
        html   = RestClient.get(url).body

        next if html.include? '[maker_name]'

        parsed = Nokogiri::HTML(html)

        larger_image_link = parsed.css('#zoomImageLarge').first
        image_url = URI.join(url, larger_image_link['href'])
        RestClient.get(image_url.to_s)

        LOG.info "Success: #{url} | Found larger image link | Proceeding"

        File.open("#{__dir__}/app/assets/images/gallery/#{id}.jpg", 'wb') do |fo|
          fo.write open(image_url.to_s).read
        end

        return image_url
      rescue RestClient::NotFound
        next
      end
    end
  end
end

gallery_file = File.read("#{__dir__}/app/data/art.json")
gallery_data = JSON.parse(gallery_file)

puts gallery_data.size

gallery_data.each do |piece|
  puts "Getting url for item #{piece['object_key']}"
  GACRandomPicture.fetch(piece['object_key'])
end
