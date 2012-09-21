

message = (text) ->
  console?.log "message: #{text}"
  $('#message').text text




class Cell

  constructor: (state = "blank") ->
    @state = state

  toHtml: ->
    $html = $("<div class=\"cell\ #{@state}\">#{@state}</div>")
    cell = @
    $html.on 'click', () ->
      if cell.state == "blank"
        cell.state = "taken"
        message('good play')
      else
        message('potato already taken')
      $html.replaceWith cell.toHtml()




class Game

  constructor: (size) ->
    @size = size
    @initialize_grid()
    @$game = $('#game')
    @draw()

  initialize_grid: ->
    @grid = []
    i = 1
    while i <= @size
      j = 1
      row = []
      while j <= i
        row.push(new Cell("blank"))
        j += 1
      @grid.push row
      i += 1

  draw: ->
    @$game.empty()
    i = 1
    for row in @grid
      $row = $("<div class=\"row row_#{i}\"/>")
      for cell in row
        $row.append cell.toHtml()
      @$game.append $row

      



window.Game = Game

