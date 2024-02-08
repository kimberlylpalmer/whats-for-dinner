"""updated cooking time format

Revision ID: 4d92ab0c150b
Revises: 779318fa8ba5
Create Date: 2024-02-08 06:45:21.821692

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4d92ab0c150b'
down_revision = '779318fa8ba5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recipes', schema=None) as batch_op:
        batch_op.alter_column('cooking_time',
               existing_type=sa.TIME(),
               type_=sa.String(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recipes', schema=None) as batch_op:
        batch_op.alter_column('cooking_time',
               existing_type=sa.String(),
               type_=sa.TIME(),
               existing_nullable=True)

    # ### end Alembic commands ###
