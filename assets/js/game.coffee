

message = (text) ->
  console?.log "message: #{text}"
  $('#message').text text


class Cell

  constructor: (game, x, y, state = "blank") ->
    @x = x
    @y = y
    @game = game
    @state = state

  toHtml: ->
    $html = $("<div class=\"cell\ #{@state}\">#{@state}</div>")
    cell = @
    $html.on 'click', () ->
      if cell.state == "blank"
        cell.state = "taken"
        message("good play at #{cell.x}, #{cell.y}")
      else
        message('potato already taken')
      $html.replaceWith cell.toHtml()



# The Game grid of Cells [x,y]
#
# [0,0]
# [1,0] [2,1]
# [2,0] [2,1] [2,2]
# [3,0] [3,1] [3,2] [3,3]

class Game

  constructor: (size) ->
    @size = size
    @initialize_grid()
    @$game = $('#game')
    @my_sore = 0
    @their_sore = 0
    @draw()

  initialize_grid: ->
    @grid = []
    y = 0
    while y < @size
      x = 0
      row = []
      while x < y
        row[x] = (new Cell(@, x, y, "blank"))
        x += 1
      @grid[y] = row
      y += 1

  draw: ->
    @$game.empty()
    y = 0
    for row in @grid
      $row = $("<div class=\"row row_#{y}\"/>")
      for cell in row
        $row.append cell.toHtml()
      @$game.append $row
      y += 1

      



window.Game = Game

