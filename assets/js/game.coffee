

message = (text) ->
  console?.log "message: #{text}"
  $('#message').text text


class Cell

  constructor: (game, x, y, state = "blank") ->
    @x = x
    @y = y
    @game = game
    @owner = '______'
    @state = state

  toHtml: ->
    @$html = $("<div class=\"cell\ #{@state}\">#{@owner}</div>")
    cell = @
    @$html.on 'click', ->
      cell.clicked("me")

  clicked: (clicked_by) ->
    @owner = clicked_by
    if @state == "blank"
      @state = "taken"
      score = @game.score(@)
      @game.scores[@owner] ?= 0
      @game.scores[@owner] += score
      @game.updateScores()
      message("good play at #{@x}, #{@y}, score: #{score}")
      sendMove(@x, @y)
    else
      message('potato already taken')
    @$html.replaceWith @toHtml()
    @game.overCheck()


window.Cell = Cell

# The Game grid of Cells [y,x] ( y down, x across)
#
# [0,0]
# [1,0] [1,1]
# [2,0] [2,1] [2,2]
# [3,0] [3,1] [3,2] [3,3]

class Game

  constructor: (size = 5) ->
    @size = size
    @initialize_grid()
    @$game = $('#game')
    @scores = []
    @draw()

  initialize_grid: ->
    @grid = []
    y = 0
    while y < @size
      x = 0
      row = []
      while x <= y
        row[x] = (new Cell(@, x, y, "blank"))
        x += 1
      @grid[y] = row
      y += 1

  score: (cell) ->
    score = 0
    # the across score
    if cell.y > 0
      full = true
      for c in @grid[cell.y]
        full = false if c.state == 'blank'
      if full == true
        score += (cell.y + 1)

    # the uphill score
    full = true
    s = 0
    for row in @grid
      if row[cell.x]?
        s += 1
        full = false if row[cell.x].state == "blank"
    if full == true and s > 1
      score += s
    # the downhill score
    full = true
    s = 1
    for num in [1..@size]
      if cxy = @grid[cell.y - num]?[cell.x - num]
        s += 1
        full = false if cxy.state == "blank"
      if cxy = @grid[cell.y + num]?[cell.x + num]
        s += 1
        full = false if cxy.state == "blank"
    if full == true and s > 1
      score += s
    # return the sum of three possible rows
    return score

  updateScores: ->
    text = ""
    for k,v of @scores
      text += "#{k}:#{v} "
    @$scores.text text

  draw: ->
    @$game.empty()
    y = 0
    for row in @grid
      $row = $("<div class=\"row row_#{y}\"/>")
      for cell in row
        $row.append cell.toHtml()
      @$game.append $row
      y += 1
    @$scores = $("<div id=\"scores\"/>")
    @$game.append @$scores
    @updateScores()

  overCheck: ->
    over = true
    for row in @grid
      for cell in row
        over = false if cell.state == 'blank'
    if over
      window.alert('Game Over!')
      


window.Game = Game

