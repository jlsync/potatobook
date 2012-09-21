
class Cell

  constructor: (state) ->
    @state = state

  toHtml: ->
    "<div class=\"cell\ #{@state}\">#{@state}</div>"


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

